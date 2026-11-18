// Edite aqui os dados reais da padaria.
export const CONFIG = {
  whatsapp: '556781341739', // DDI+DDD+número, só dígitos
  phone: '(67) 8134-1739',
  address: 'Rua das Padarias, 123 – Centro, Campo Grande/MS',
  hours: [['Segunda a sábado', '06:00 – 20:00'], ['Domingo e feriados', '06:00 – 13:00']],
  instagram: 'https://instagram.com/padariasaraiva',
  facebook: 'https://facebook.com/padariasaraiva',
};
export const brl = (cents) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
