// Standardowa szerokość treści + padding boczny — spójne na wszystkich stronach.
export function Container({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`max-w-[1440px] mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </Tag>
  )
}
