import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCasesPLNtoUSD = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'PLN', to: 'USD' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'PLN', to: 'USD' },
    { amount: '1000', from: 'PLN', to: 'USD' },
    { amount: '2000', from: 'PLN', to: 'USD' },
    { amount: '30000000', from: 'PLN', to: 'USD' },
  ];

  for (const testObj of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      const expectedConversion = `PLN ${testObj.amount.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}.00 = $${(parseInt(testObj.amount) / 3.5)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
          conversionRate={3.5}
        />
      );

      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent(expectedConversion);
    });
    cleanup();
  }

  //   afterEach(cleanup);

  const testCasesUSDtoPLN = [
    { amount: '100', from: 'USD', to: 'PLN' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'USD', to: 'PLN' },
    { amount: '345', from: 'USD', to: 'PLN' },
    { amount: '1000', from: 'USD', to: 'PLN' },
    { amount: '2000', from: 'USD', to: 'PLN' },
    { amount: '30000000', from: 'USD', to: 'PLN' },
  ];

  for (const testObj of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      const expectedConversion = `$${testObj.amount.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}.00 = PLN ${(parseInt(testObj.amount) * 3.5)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent(expectedConversion);
    });
    cleanup();
  }

  const testCasesPLNtoPLNandUSDtoUSD = [
    { amount: '100', from: 'USD', to: 'USD' },
    { amount: '20', from: 'PLN', to: 'PLN' },
    { amount: '200', from: 'USD', to: 'USD' },
    { amount: '345', from: 'PLN', to: 'PLN' },
    { amount: '2000', from: 'PLN', to: 'PLN' },
    { amount: '30000000', from: 'PLN', to: 'PLN' },
    { amount: '1000', from: 'PLN', to: 'PLN' },
    { amount: '2006876540', from: 'USD', to: 'USD' },
  ];

  for (const testObj of testCasesPLNtoPLNandUSDtoUSD) {
    it(`should render the same value on both sides of the equality sign when from and to values are the same (${testObj.from} -> ${testObj.to})`, () => {
      const amount = testObj.amount;
      const from = testObj.from;
      const to = testObj.to;
      const expectedConversion = `${
        from === 'USD' ? '$' : 'PLN'
      }${amount}.00 = ${to === 'USD' ? '$' : 'PLN'}${amount}.00`;

      render(<ResultBox from={from} to={to} amount={parseInt(amount)} />);

      const result = screen.getByTestId('result');
      expect(result.textContent.replace(/[\s,]+/g, '')).toEqual(
        expectedConversion.replace(/[\s,]+/g, '')
      );
    });
    cleanup();
  }
  it('should render Wrong value… if amount value is negative', () => {
    const amount = -100;
    render(<ResultBox from="PLN" to="USD" amount={amount} />);
    const result = screen.getByTestId('result');
    expect(result.textContent).toEqual('Wrong value...');
  });


});
