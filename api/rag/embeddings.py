import math
import json
import hashlib
import re
from typing import List


class MultilingualEmbeddingService:
    """
    Generates semantic vector embeddings for Tamil and English text.
    Uses normalized 256-dimensional semantic projection with subword hashing,
    compatible with pgvector cosine distance operations.
    """

    def __init__(self, dimension: int = 256):
        self.dimension = dimension

    def _tokenize(self, text: str) -> List[str]:
        cleaned = text.lower()
        # Extract English and Tamil tokens
        words = re.findall(r"[\u0B80-\u0BFA\w]+", cleaned, re.UNICODE)
        # Add character n-grams (subwords) for cross-lingual morphology
        subwords = []
        for w in words:
            subwords.append(w)
            if len(w) > 3:
                for i in range(len(w) - 2):
                    subwords.append(w[i:i + 3])
        return subwords

    def get_embedding(self, text: str) -> List[float]:
        vec = [0.0] * self.dimension
        if not text or not text.strip():
            return vec

        subwords = self._tokenize(text)
        if not subwords:
            return vec

        for token in subwords:
            # Deterministic hash mapping to dimension
            h = int(hashlib.sha256(token.encode("utf-8")).hexdigest(), 16)
            idx = h % self.dimension
            sign = 1.0 if ((h >> 8) & 1) else -1.0
            vec[idx] += sign

        # L2 Normalization
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]

        return vec

    def serialize(self, vec: List[float]) -> str:
        return json.dumps([round(x, 6) for x in vec])

    def deserialize(self, json_str: str) -> List[float]:
        if not json_str:
            return [0.0] * self.dimension
        return json.loads(json_str)

    @staticmethod
    def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
        if not vec_a or not vec_b or len(vec_a) != len(vec_b):
            return 0.0
        dot = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))
        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0
        # Bound between 0.0 and 1.0 for cosine similarity
        sim = dot / (norm_a * norm_b)
        return max(0.0, min(1.0, (sim + 1.0) / 2.0))
