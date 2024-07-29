import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Patients page and interacts with form', () => {
  render(<App />);
  
  const button = screen.getByText(/Patients/i);
  fireEvent.click(button);
  
  const nameInput = screen.getByLabelText(/Nome/i);
  fireEvent.change(nameInput, { target: { value: 'Novo Paciente' } });
  
  const saveButton = screen.getByText(/Salvar/i);
  fireEvent.click(saveButton);
  
});
