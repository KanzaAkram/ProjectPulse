/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  DeleteOutlined,
  WaterDropOutlined,
  OfflineBoltOutlined,
  AirOutlined,
  LocalParkingOutlined,
  Timeline,
  CloudOutlined,
  CommuteOutlined,
  AdminPanelSettingsOutlined,
  Diversity1,
  Summarize,
  Co2Outlined,
  TrafficOutlined,
  FormatListBulleted,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "overview",
  },
  {
    text: "Project Task Management",
    icon: null,
  },
  {
    text: "Tasks",
    icon: <FormatListBulleted />,
    path: "tasks",
  },
  {
    text: "Project Timeline Management",
    icon: null,
  },
  {
    text: "Timeline",
    icon: <Timeline />,
    path: "timeline",
  },
  {
    text: "Project Team Management",
    icon: null,
  },
  {
    text: "Team",
    icon: <Diversity1 />,
    path: "team",
  },
  {
    text: "Project Resources Management",
    icon: null,
  },
  {
    text: "Status Reports",
    icon: <Summarize />,
    path: "status-reports",
  },
  // {
  //   text: "Public Transport",
  //   icon: <CommuteOutlined />,
  //   path: "publictransport",
  // },
  // {
  //   text: "Parking Availability",
  //   icon: <LocalParkingOutlined />,
  //   path: "parkingavailability",
  // },
  // {
  //   text: "Utilities and Energy",
  //   icon: null,
  // },
  // {
  //   text: "Energy Consumption",
  //   icon: <OfflineBoltOutlined />,
  //   path: "energy-consumption",
  // },
  // {
  //   text: "Water Usage",
  //   icon: <WaterDropOutlined />,
  //   path: "waterusage",
  // },
];

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "scroll" }}>
            <Box m="1.5rem 2rem 1.5rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  width="fit-content"
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    component={motion.div}
                    animate={{
                      scale: [1, 1.1, 1],
                      x: [0, -2, 2, -2, 2, 0], // Small horizontal shake effect
                      y: [0, -1, 1, -1, 1, 0], // Small vertical shake effect
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    Project Pulse Dashboard
                  </Typography>

                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, path }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 2rem" }}
                      color={theme.palette.secondary[300]}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = path ? path.toLowerCase() : text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (path) {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[200]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary[900]
                            : theme.palette.secondary[100],
                        "&:hover": {
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[200]
                              : "",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1.5rem 3rem"
            >
              {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              {/* <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              /> */}
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;

