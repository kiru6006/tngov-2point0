import re
from typing import List, Dict, Any


class MultilingualChunker:
    """
    Multilingual sliding-window text chunker for Tamil and English administrative text.
    Standard: 512-token window with 64-token overlap.
    """

    def __init__(self, chunk_size: int = 512, chunk_overlap: int = 64):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def _approx_tokens(self, text: str) -> List[str]:
        # Split on whitespace and punctuation while keeping Tamil graphemes together
        tokens = re.findall(r"[\u0B80-\u0BFA\w]+|[^\s\w]", text, re.UNICODE)
        return tokens

    def chunk_text(self, text: str, metadata: Dict[str, Any]) -> List[Dict[str, Any]]:
        if not text or not text.strip():
            return []

        tokens = self._approx_tokens(text)
        total_tokens = len(tokens)

        if total_tokens <= self.chunk_size:
            chunk_content = " ".join(tokens)
            return [
                {
                    "chunk_index": 0,
                    "content": chunk_content,
                    "token_count": total_tokens,
                    "doc_id": metadata.get("doc_id", ""),
                    "source_url": metadata.get("source_url", ""),
                    "status": metadata.get("status", "ACTIVE"),
                }
            ]

        chunks = []
        start = 0
        chunk_idx = 0
        step = self.chunk_size - self.chunk_overlap
        if step <= 0:
            step = self.chunk_size

        while start < total_tokens:
            end = min(start + self.chunk_size, total_tokens)
            window_tokens = tokens[start:end]
            chunk_content = " ".join(window_tokens)

            chunks.append({
                "chunk_index": chunk_idx,
                "content": chunk_content,
                "token_count": len(window_tokens),
                "doc_id": metadata.get("doc_id", ""),
                "source_url": metadata.get("source_url", ""),
                "status": metadata.get("status", "ACTIVE"),
            })
            chunk_idx += 1
            if end >= total_tokens:
                break
            start += step

        return chunks
