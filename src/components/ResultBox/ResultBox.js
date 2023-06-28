import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  if (amount < 0) {
    return (
      <div data-testid="result" className={styles.result}>
        Wrong value...
      </div>
    );
  }

  let convertedAmount;
  if (from === 'USD' && to === 'PLN') {
    convertedAmount = convertUSDToPLN(amount);
  } else if (from === 'PLN' && to === 'USD') {
    convertedAmount = convertPLNToUSD(amount);
  } else {
    convertedAmount = formatAmountInCurrency(amount, from);
  }

  const formattedAmount = formatAmountInCurrency(amount, from);

  return (
    <div data-testid="result" className={styles.result}>
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ResultBox;
