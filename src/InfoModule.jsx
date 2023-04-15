import "./styles.css";
import { ReactComponent as InfoOutlined } from "./info.svg";
import React from "react";
import {
  Box,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useState } from "react";

export default function InfoModule({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`module ${text.class}`}>
      {text.category && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h5 className="module_category">{text.category}</h5>
          <IconButton variant="plain" size="sm" onClick={() => setIsOpen(true)}>
            <InfoOutlined fill="darkseagreen" />
          </IconButton>
        </Box>
      )}
      <h3 className="module_title">
        {text.title} {text.titleExtra && <span>{text.titleExtra}</span>}
      </h3>
      {text.ends && <p className="module_time">до {text.ends}</p>}
      <p className="module_description">{text.description}</p>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog
          size="sm"
          variant="plain"
          sx={(theme) => ({ boxShadow: theme.shadow.xs })}
        >
          <ModalClose />
          <Typography level="h5">{text.category}</Typography>
          <Typography level="body">{text.categoryDescription}</Typography>
        </ModalDialog>
      </Modal>
    </div>
  );
}
