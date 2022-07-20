import { useState } from 'react';

const useForm = (initialFormValues) => {
  const [formData, setFormData] = useState(initialFormValues);

  return [
    formData,
    e => setFormData({ ...formData, [e.target.name]: e.target.value })
  ]
}

export default useForm;