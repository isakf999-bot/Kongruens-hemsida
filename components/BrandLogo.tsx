export function BrandLogo({
  className,
  onDark = false,
  loading = "eager",
}: {
  className?: string;
  onDark?: boolean;
  loading?: "eager" | "lazy";
}) {
  return (
    <img
      className={className}
      src={onDark ? "/images/logo-on-dark.webp" : "/images/logo.webp"}
      alt="Matts Svensson — Personlig vägledare"
      width={960}
      height={185}
      decoding="async"
      loading={loading}
      fetchPriority={loading === "lazy" ? "low" : "auto"}
    />
  );
}
