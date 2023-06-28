import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCasesPLNtoUSD = [
    {
      amount: '100',
      from: 'PLN',
      to: 'USD',
      expectedValue: 'PLN 100.00 = $28.57',
    },
    {
      amount: '20',
      from: 'PLN',
      to: 'USD',
      expectedValue: 'PLN 20.00 = $5.71',
    },
    {
      amount: '200',
      from: 'PLN',
      to: 'USD',
      expectedValue: 'PLN 200.00 = $57.14',
    },
  ];

  for (const testObj of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      const expectedConversion = testObj.expectedValue;
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
  const testCasesUSDtoPLN = [
    {
      amount: '100',
      from: 'USD',
      to: 'PLN',
      expectedValue: '$100.00 = PLN 350.00',
    },
    {
      amount: '20',
      from: 'USD',
      to: 'PLN',
      expectedValue: '$20.00 = PLN 70.00',
    },
    {
      amount: '200',
      from: 'USD',
      to: 'PLN',
      expectedValue: '$200.00 = PLN 700.00',
    },
  ];

  for (const testObj of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      const expectedConversion = testObj.expectedValue;
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

  const testCasesPLNtoPLN = [
    {
      amount: '20',
      from: 'PLN',
      to: 'PLN',
      expectedValue: 'PLN 20.00 = PLN 20.00',
    },
    {
      amount: '200',
      from: 'PLN',
      to: 'PLN',
      expectedValue: 'PLN 200.00 = PLN 200.00',
    },
    {
      amount: '345',
      from: 'PLN',
      to: 'PLN',
      expectedValue: 'PLN 345.00 = PLN 345.00',
    },
  ];

  for (const testObj of testCasesPLNtoPLN) {
    it(`should render the same value on both sides of the equality sign when from and to values are the same (PLN-> PLN)`, () => {
      const amount = testObj.amount;
      const from = testObj.from;
      const to = testObj.to;

      const expectedConversion = testObj.expectedValue;

      render(<ResultBox from={from} to={to} amount={parseInt(amount)} />);

      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent(expectedConversion);
    });
    cleanup();
  }
  const testCasesUSDtoUSD = [
    {
      amount: '20',
      from: 'USD',
      to: 'USD',
      expectedValue: '$20.00 = $20.00',
    },
    {
      amount: '200',
      from: 'USD',
      to: 'USD',
      expectedValue: '$200.00 = $200.00',
    },
    {
      amount: '345',
      from: 'USD',
      to: 'USD',
      expectedValue: '$345.00 = $345.00',
    },
    {
      amount: '100',
      from: 'USD',
      to: 'USD',
      expectedValue: '$100.00 = $100.00',
    },
    {
      amount: '500',
      from: 'USD',
      to: 'USD',
      expectedValue: '$500.00 = $500.00',
    }
  ];
  for (const testObj of testCasesUSDtoUSD) {
    it(`should render the same value on both sides of the equality sign when from and to values are the same (USD-> USD)`, () => {
      const amount = testObj.amount;
      const from = testObj.from;
      const to = testObj.to;
      
      const expectedConversion = testObj.expectedValue;
      render(<ResultBox from={from} to={to} amount={parseInt(amount)} />);
      const result = screen.getByTestId('result');
      expect(result).toHaveTextContent(expectedConversion);
    });
    cleanup();
  }
  it('should render Wrong value… if amount is negative', () => {
    const amount = -100;
    render(<ResultBox from="PLN" to="USD" amount={amount} />);
    const result = screen.getByTestId('result');
    expect(result.textContent).toEqual('Wrong value...');
  });
});
