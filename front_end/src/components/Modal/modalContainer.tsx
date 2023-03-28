import { Modal, ModalOverlay } from "@chakra-ui/react";
import { iModalContainer } from "@/interfaces/pages.interfaces";
import { ModalFormCreateContact } from "./modalFormCreateContact";
import { ModalFormUpdateContact } from "./modalFormUpdateContact";

export const ModalContainer = ({ isOpen, onClose, modalFormat }: iModalContainer) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            {modalFormat === "createContact" && <ModalFormCreateContact onClose={onClose} />}
            {modalFormat === "updateContact" && <ModalFormUpdateContact onClose={onClose} />}
        </Modal>
    );
};
