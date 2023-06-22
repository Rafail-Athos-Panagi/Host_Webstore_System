import { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export default function ProductQuantityIndex() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Form>
      <Form.Label>Quantity:</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary" onClick={handleDecreaseQuantity}>-</Button>
        </InputGroup.Prepend>
        <FormControl type="number" min="1" value={quantity} onChange={handleQuantityChange} />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleIncreaseQuantity}>+</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

