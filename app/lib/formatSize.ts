export const formatSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const value = Math.abs(bytes);
  const unitIndex = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1
  );

  const size = value / 1024 ** unitIndex;
  const formatted = unitIndex === 0 ? size.toFixed(0) : size.toFixed(1);

  return `${Number(formatted)} ${units[unitIndex]}`;
};
