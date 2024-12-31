import React from "react";
import { Modal, ModalClose, ModalDialog, Typography, Button } from "@mui/joy";
import { AppContext } from "./AppContext";

const WelcomeInfo = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        aria-labelledby="modal-dialog-title"
        aria-describedby="modal-dialog-description"
        size="sm"
        variant="plain"
        sx={(theme) => ({
          boxShadow: theme.shadow.xs,
          maxWidth: 430,
          width: "calc(100vw - 40px)",
          overflow: "scroll",
        })}
      >
        <ModalClose />
        <Typography id="modal-dialog-title" level="h3">
          Привет!
        </Typography>
        <div id="modal-dialog-description" level="body">
          <Typography>
            Прежде, чем ты&nbsp;откроешь для себя мир Тары с&nbsp;Лунными
            и&nbsp;Солнечными циклами и&nbsp;начнешь применять это в&nbsp;своей
            жизни, я&nbsp;хочу сказать тебе несколько важных слов.
          </Typography>

          <Typography>
            Этот календарь не&nbsp;предназначен для практики лунной магии
            &laquo;начинай дела в&nbsp;новолуние и&nbsp;будет тебе
            счастье&raquo;.
          </Typography>

          <Typography>
            Задача приложения&nbsp;&mdash; возвращение внимания вовнутрь
            из&nbsp;внешних процессов, которые продиктованы внешними циклами.
          </Typography>

          <Typography>
            Тара создана для того, чтобы благодаря знаниям внешних циклов выйти
            на&nbsp;свой ритм, на&nbsp;свое внутреннее время.
          </Typography>

          <Typography>
            Внутреннее время&nbsp;&mdash; это время, которое длится столько,
            сколько длится процесс, а&nbsp;не&nbsp;сколько продиктовано,
            например, Луной.
          </Typography>

          <Typography>
            Луна и&nbsp;другие планетарные циклы является внешним отображением
            наших эмоций и&nbsp;исходящих из&nbsp;них стратегий поведения,
            по&nbsp;сути следствием, а&nbsp;не&nbsp;причиной происходящего.
          </Typography>

          <Typography>
            Задумайтесь об&nbsp;этом перед тем как пользоваться календарем
            и&nbsp;задайте намерение выйти на&nbsp;свой ритм.
          </Typography>

          <Typography>
            Каждый раз, когда заходите в&nbsp;приложение, вспоминайте
            о&nbsp;том, что космос у&nbsp;нас внутри и&nbsp;человек пришел сюда
            творить без ограничений. Мы&nbsp;создали Тару, чтобы вам
            об&nbsp;этом напомнить.
          </Typography>

          <Typography>В&nbsp;добрый Путь!</Typography>
        </div>
        <Button
          onClick={onClose}
          sx={{ mt: 0.5, color: "#304f4f", mr: "auto" }}
          color="success"
          variant="soft"
          size="md"
        >
          Принято!
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default WelcomeInfo;
