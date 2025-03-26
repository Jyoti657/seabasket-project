interface Props {
  amount: number;
}

const FormatterPrice: React.FC<Props> = ({ amount }) => {
  return <>{amount}</>;
};

export default FormatterPrice;
