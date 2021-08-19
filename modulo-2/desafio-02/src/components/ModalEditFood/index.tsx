import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { FormHandles, SubmitHandler } from "@unform/core";

interface FoodsData {
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
  id: number;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodsData;
  handleUpdateFood: (food: FoodsData) => Promise<void>;
}

function ModalEditFood({
  editingFood,
  handleUpdateFood,
  setIsOpen,
  isOpen,
}: ModalEditFoodProps):JSX.Element {
  const formRef = createRef<FormHandles>();

  const handleSubmit: SubmitHandler<FoodsData> = (food: FoodsData) => {
    handleUpdateFood(food);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
