import React from "react";
import { Navbar, Button, Link } from "@nextui-org/react";
import { POMPLogo } from "./POMPLogo";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Nav() {
  
  return (
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <POMPLogo />
        </Navbar.Brand>
        {/* <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content> */}
        <Navbar.Content>
          <Navbar.Item>
            <WalletMultiButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>     
  )
}
