interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && (
        <span className="text-sm text-muted-foreground">
          {subtitle}
        </span>
      )}
    </div>
  )
}
