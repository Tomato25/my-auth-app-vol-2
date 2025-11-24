import Navigation from "@/components/navigation/Navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
  <div> 
    <Navigation />
    {children}
  </div>
  )
}
