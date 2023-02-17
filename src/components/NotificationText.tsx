export interface ErrorTextProps {
  type: string
  children: React.ReactNode
}

function NotificationText({ type, children }: ErrorTextProps) {
  return (
    <p className={`text-center text-${type} mt-8`}>{children}</p>
  )
}

export default NotificationText
