export function BrandLogo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <img
      className={className}
      src={onDark ? "/images/logo-on-dark.png" : "/images/logo.png"}
      alt="Matts Svensson — Personlig vägledare"
      width={960}
      height={185}
      decoding="async"
    />
  );
}
