import "./styles.css";
import { ReactComponent as InfoOutlined } from "./info.svg";
import "@flodesk/grain/es/styles/base.css";
import React from "react";
import {
  Box,
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  IconButton,
} from "@mui/joy";
// import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Arrange, Icon, IconInfo } from "@flodesk/grain";
import { useState } from "react";

export default function InfoModule({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`module ${text.class}`}>
      {text.category && (
        <Box sx={{ display: "flex" }}>
          <h5 className="module_category">{text.category}</h5>
          <IconButton variant="plain" onClick={() => setIsOpen(true)}>
            <InfoOutlined fill="darkseagreen" />
          </IconButton>
        </Box>
      )}
      <h3 className="module_title">
        {text.title} {text.titleExtra && <span>{text.titleExtra}</span>}
      </h3>
      {text.ends && <p className="module_time">до {text.ends}</p>}
      <p className="module_description">{text.description}</p>
      {/* <Modal
        cardPadding="l"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={text.category}
        description={text.categoryDescription}
      ></Modal> */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog size="sm" variant="plain">
          <ModalClose />
          <Typography level="h3">{text.category}</Typography>
          <Typography level="body">{text.categoryDescription}</Typography>
        </ModalDialog>
      </Modal>
    </div>
  );
}
