import { Header } from "./header"
export default function Layout({ children }) {

  return <div>
    <div>
      <Header />
    </div>
    {children}
  </div>;
}
