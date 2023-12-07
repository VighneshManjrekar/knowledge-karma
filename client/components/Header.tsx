import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import NavLogo from "../static/logos/logoo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className=" w-screen">
      <Navbar>
        <NavbarBrand>
          <Image src={NavLogo} width={20} height={20} alt="Nav Logo" />
          <p className="font-bold text-inherit m-2">KnowledgeKarma</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#features">
              Notes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#testimonial">
              Leaders
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#pricing">
              Connect
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#blog">
              Blog
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="default" href="#" variant="flat">
              <b>Login</b>
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              style={{ backgroundColor: "#2E2E2E", color: "#FFFFFF" }}
              href="#"
              variant="flat"
            >
              <b> Get Started</b>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
