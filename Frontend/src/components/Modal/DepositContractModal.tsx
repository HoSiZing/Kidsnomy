import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DepositContractModal.module.css';

interface DepositContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
}

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C9.92893 3.25 8.25 4.92893 8.25 7C8.25 9.07107 9.92893 10.75 12 10.75C14.0711 10.75 15.75 9.07107 15.75 7C15.75 4.92893 14.0711 3.25 12 3.25ZM12 9.25C10.7574 9.25 9.75 8.24264 9.75 7C9.75 5.75736 10.7574 4.75 12 4.75C13.2426 4.75 14.25 5.75736 14.25 7C14.25 8.24264 13.2426 9.25 12 9.25ZM22.5 0.25H1.5C1.08579 0.25 0.75 0.585786 0.75 1V13C0.75 13.4142 1.08579 13.75 1.5 13.75H22.5C22.9142 13.75 23.25 13.4142 23.25 13V1C23.25 0.585786 22.9142 0.25 22.5 0.25ZM18.1547 12.25H5.84531C5.33369 10.5197 3.98033 9.16631 2.25 8.65469V5.34531C3.98033 4.83369 5.33369 3.48033 5.84531 1.75H18.1547C18.6663 3.48033 20.0197 4.83369 21.75 5.34531V8.65469C20.0197 9.16631 18.6663 10.5197 18.1547 12.25ZM21.75 3.75344C20.8504 3.36662 20.1334 2.64959 19.7466 1.75H21.75V3.75344ZM4.25344 1.75C3.86662 2.64959 3.14959 3.36662 2.25 3.75344V1.75H4.25344ZM2.25 10.2466C3.14959 10.6334 3.86662 11.3504 4.25344 12.25H2.25V10.2466ZM19.7466 12.25C20.1334 11.3504 20.8504 10.6334 21.75 10.2466V12.25H19.7466Z" fill="#8A5C5C"/>
  </svg>
);

const DepositContractModal: React.FC<DepositContractModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
}) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 연동
      console.log('예금 상품 계약 요청:', { productId, productName, amount });
      
      // 성공 시 ResultPage로 이동
      navigate('/result', { 
        state: { 
          title: '계약이 성공하였어요',
          description: '계약이 완료되었습니다.',
          buttonText: '확인',
          buttonLink: '/child/bank/products'
        } 
      });
    } catch (error) {
      console.error('계약 실패:', error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <h2>예치할 금액을 입력해 주세요</h2>
        <p>금액을 입력해 주세요.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <span className={styles.moneyIcon}>
              <MoneyIcon />
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="금액 입력"
              min="1000"
              step="1000"
              required
            />
            <span className={styles.wonSymbol}>₩</span>
          </div>

          <button type="submit" className={styles.contractButton}>
            계약하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositContractModal; 