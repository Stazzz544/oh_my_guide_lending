export type TextChunk = {
  start: number;
  end: number;
};

const MAX_CHUNK_LENGTH = 120;

export const splitIntoChunks = (text: string): TextChunk[] => {
  const pieces = text.match(/[^,;]+[,;]?\s*/g) ?? [text];
  const chunks: TextChunk[] = [];
  let cursor = 0;
  let chunkStart = 0;

  pieces.forEach((piece) => {
    const pieceEnd = cursor + piece.length;
    if (pieceEnd - chunkStart > MAX_CHUNK_LENGTH && cursor > chunkStart) {
      chunks.push({ start: chunkStart, end: cursor });
      chunkStart = cursor;
    }
    cursor = pieceEnd;
  });
  chunks.push({ start: chunkStart, end: text.length });

  return chunks;
};
