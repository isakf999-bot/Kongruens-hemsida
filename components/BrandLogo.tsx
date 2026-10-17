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
      src={onDark ? "/images/logo-on-dark-700.webp" : "/images/logo-700.webp"}
      srcSet={
        onDark
          ? "/images/logo-on-dark-480.webp 480w, /images/logo-on-dark-700.webp 700w"
          : "/images/logo-480.webp 480w, /images/logo-700.webp 700w"
      }
      sizes="(max-width: 860px) 16.5rem, 21.5rem"
      alt="Matts Svensson — Personlig vägledare"
      width={700}
      height={135}
      decoding="async"
      loading={loading}
      fetchPriority={loading === "lazy" ? "low" : "auto"}
    />
  );
}
