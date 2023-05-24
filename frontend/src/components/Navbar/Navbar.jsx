import React from "react";
import {
  Navbar,
  Button,
  Text,
  Avatar,
  Dropdown,
  Spacer,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logoutMechanic, logoutUser } from "../../redux/Slices/authSlice";

function NavbarC() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Active links
  const location = useLocation();
  let navigation = [];

  const { role, profile } = useSelector((state) => state.auth);

  let links = null;
  if (role === "user") {
    navigation = ["Nearby Mechanics", "Requests"];
    links = (
      <Navbar.Content variant="underline">
        {navigation.map((item, index) => (
          <Navbar.Item key={index}>
            <Navbar.Link
              isActive={location.pathname.includes(
                item.replace(" ", "").toLowerCase()
              )}
              as={Link}
              to={
                item === "Nearby Mechanics"
                  ? "/nearbymechanics"
                  : `/user/${item.toLowerCase()}`
              }
            >
              {item}
            </Navbar.Link>
          </Navbar.Item>
        ))}
        <Spacer />
        <Dropdown>
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                css={{ border: "2px solid black" }}
                size="md"
                src={profile?.profileImg}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu aria-label="User menu actions" color="default">
            <Dropdown.Item key="name" css={{ height: "$18" }}>
              <Text color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {profile?.name}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="Profile" withDivider>
              <Text
                onClick={() => {
                  navigate("/user/profile");
                }}
              >
                Profile
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="Logout">
              <Text
                onClick={() => {
                  dispatch(logoutUser({ navigate }));
                }}
              >
                Logout
              </Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    );
  } else if (role === "mechanic") {
    navigation = ["Dashboard", "Services", "Requests"];
    links = (
      <Navbar.Content variant="underline-rounded" activeColor="primary">
        {navigation.map((item, index) => (
          <Navbar.Item key={index}>
            <Navbar.Link
              isActive={location.pathname.includes(item.toLowerCase())}
              as={Link}
              to={
                item === "Dashboard"
                  ? "/dashboard"
                  : `/mechanic/${item.toLowerCase()}`
              }
            >
              {item}
            </Navbar.Link>
          </Navbar.Item>
        ))}
        <Spacer />
        <Dropdown>
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                size="lg"
                src={profile?.profileImg}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu aria-label="User menu actions" color="default">
            <Dropdown.Item key="name" css={{ height: "$18" }}>
              <Text color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {profile?.name}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="Profile" withDivider>
              <Text
                onClick={() => {
                  navigate("/mechanic/profile");
                }}
              >
                Profile
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="Logout">
              <Text
                onClick={() => {
                  console.log("Mechanic Logout");
                  dispatch(logoutMechanic({ navigate }));
                }}
              >
                Logout
              </Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    );
  } else {
    links = (
      <Navbar.Content>
        <Navbar.Item>
          <Button
            onClick={() => navigate("/signin")}
            auto
            flat
            css={{ color: "White", backgroundColor: "Black" }}
          >
            Sign In
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button
            onClick={() => navigate("/user/signup")}
            auto
            flat
            css={{ color: "White", backgroundColor: "Black" }}
          >
            User Sign Up
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button
            onClick={() => navigate("/mechanic/signup")}
            auto
            flat
            css={{ color: "White", backgroundColor: "Black" }}
          >
            Mechanic Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    );
  }

  return (
    <Navbar isBordered variant={"floating"}>
      <Navbar.Brand onClick={() => navigate("/")} css={{ cursor: "pointer" }}>
        <Logo />
        &nbsp;
        <Text weight={"bold"} size="$xl">
          ORVSA
        </Text>
      </Navbar.Brand>
      {links}
    </Navbar>
  );
}

export default NavbarC;
