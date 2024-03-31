import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const options = ["Edit", "Progress", "Completed", "Delete"];

export default function Menucomponent({ taskId, handerFun, task }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (option) => {
    handerFun(taskId, option, task);
    handleClose();
  };
  return (
    <div>
      <button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="action-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {options
          .slice(isMobile ? 0 : isMobile ? options.length : 1, isMobile ? 4 : 3)
          .map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => handleMenuItemClick(option)}
            >
              {option}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
