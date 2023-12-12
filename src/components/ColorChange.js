import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ColorChange = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const storedColor = localStorage.getItem(`color-${id}`);
        setSelectedColor(storedColor || '');
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Year in Pixels - ${id}일`
    }, [id]);

    const handleChangeColor = (color) => {
        setSelectedColor(selectedColor === color ? '' : color);
        localStorage.setItem(`color-${id}`, selectedColor === color ? '' : color); // 변경된 색상을 로컬 스토리지에 저장
    };

    const handleConfirmColor = () => {
        navigate('/', { replace: true });
    };

    return (
        <div>
            <h1 className='AskDay'>오늘은 어떤 하루였나요?</h1>

            <div style={{ marginTop: '20px' }}>
                <button className={selectedColor === 'pink' ? 'BtnPink' : 'BtnDefault'} onClick={() => handleChangeColor('pink')} style={{ marginRight: '10px' }}>
                    완벽한 날
                </button>
                <button className={selectedColor === 'green' ? 'BtnGreen' : 'BtnDefault'} onClick={() => handleChangeColor('green')} style={{ marginRight: '10px' }}>
                    기쁜 날
                </button>
                <button className={selectedColor === 'purple' ? 'BtnPurple' : 'BtnDefault'} onClick={() => handleChangeColor('purple')} style={{ marginRight: '10px' }}>
                    평범한 날
                </button>
                <button className={selectedColor === 'gray' ? 'BtnGray' : 'BtnDefault'} onClick={() => handleChangeColor('gray')} style={{ marginRight: '10px' }}>
                    피곤한 날
                </button>
                <button className={selectedColor === 'navy' ? 'BtnNavy' : 'BtnDefault'} onClick={() => handleChangeColor('navy')} style={{ marginRight: '10px' }}>
                    슬픈 날
                </button>
                <button className={selectedColor === 'red' ? 'BtnRed' : 'BtnDefault'} onClick={() => handleChangeColor('red')} style={{ marginRight: '10px' }}>
                    화난 날
                </button>
                <button className='confirmBtn' onClick={handleConfirmColor} style={{ marginLeft: '10px' }}>
                    기록하기
                </button>
            </div>
        </div>
    );
};

export default ColorChange;
