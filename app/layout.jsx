import './globals.css'

export const metadata = {
  title: 'good morning',
  description: 'git-chad',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  )
}
