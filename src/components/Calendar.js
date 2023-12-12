import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Calendar = () => {
    const [colorStatistics, setColorStatistics] = useState({});
    const [curDate, setCurDate] = useState(new Date());
    const YearNum = `${curDate.getFullYear()}`;

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Year in Pixels`
        generateColorStatistics();

    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const generateColorStatistics = () => {
        const days = 31;
        const months = 12;
        const statistics = {};

        for (let month = 1; month <= months; month++) {
            for (let day = 1; day <= days; day++) {
                const id = `day-${month}-${day}`;
                const storedColor = localStorage.getItem(`color-${id}`);

                if (storedColor) {
                    statistics[storedColor] = (statistics[storedColor] || 0) + 1;
                }
            }
        }

        setColorStatistics(statistics);
    };

    const resetColors = () => {
        // 모든 테이블의 색상을 초기화하는 함수
        const days = 31;
        const months = 12;

        for (let month = 1; month <= months; month++) {
            for (let day = 1; day <= days; day++) {
                const id = `day-${month}-${day}`;
                localStorage.removeItem(`color-${id}`);
            }
        }

        // 통계도 초기화
        setColorStatistics({});
    };

    const getMostUsedColorName = () => {
        let mostUsedColor = '';
        let maxCount = 0;

        // 가장 많이 사용된 색상 찾기
        Object.entries(colorStatistics).forEach(([color, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostUsedColor = color;
            }
        });

        // 가장 많이 사용된 색상의 이름 가져오기
        return mostUsedColor;
    };

    const mostUsedColor = getMostUsedColorName();
    const colorName = {
        'pink': '완벽한',
        'green': '기쁜',
        'purple': '평범한',
        'gray': '피곤한',
        'navy': '슬픈',
        'red': '화나는'
        // 기타 색상에 대한 이름 추가
    }[mostUsedColor.toLowerCase()] || '--';

    const todayColorMessage = `올해는 ${colorName} 해입니다.`;

    const generateTable = () => {
        const days = 31;
        const months = 12;
        const tableRows = [];
        const monthHeaderRow = [];
        for (let month = 1; month <= months; month++) {
            monthHeaderRow.push(
                <th key={`month-${month}`}>
                    {month}
                </th>
            );
        }
        tableRows.push(<tr key="month-header"><th></th>{monthHeaderRow}</tr>);

        for (let day = 1; day <= days; day++) {
            //const dayCells = [];
            const dayCells = [<td key={`day-${day}-header`}> {day}</td>];
            for (let month = 1; month <= months; month++) {

                const id = `day-${month}-${day}`;
                const backgroundColor = localStorage.getItem(`color-${id}`) || '#ffffff';
                const isInDateRange = isValidDate(month, day);

                dayCells.push(
                    <td key={id}>
                        {isInDateRange ? (
                            <Link to={`/colorchange/${id}`}>
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '1px solid #ccc',
                                        margin: '2px',
                                        backgroundColor: backgroundColor,
                                        cursor: 'pointer',
                                    }}
                                >

                                </div>
                            </Link>
                        ) : (
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '1px solid #ccc',
                                    margin: '2px',
                                    backgroundColor: 'black',
                                }}
                            >

                            </div>
                        )}
                    </td>
                );
            }

            tableRows.push(<tr key={`day-${day}`}>{dayCells}</tr>);
        }

        return tableRows;
    };

    const isValidDate = (month, day) => {
        // 4월, 6월, 9월, 11월은 30일까지 있음
        if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
            return false;
        }
        // 2월은 28일까지 있음
        if (month === 2 && day > 28) {
            return false;
        }
        // 나머지는 31일까지 있음
        if (day > 31) {
            return false;
        }
        return true;
    };

    return (
        <div>
            <h1>{YearNum} Calendar</h1>
            <div className='calendar-wrapper'>
                <table className="calendar-table" style={{ display: 'inline-block', marginRight: '20px' }}>
                    <tbody>{generateTable()}</tbody>
                </table>
                <div className='calendar-count' style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <h2>올해의 감정 기록</h2>
                    <p>{todayColorMessage}</p>
                    <ul>
                        {Object.entries(colorStatistics).map(([color, count]) => (
                            <li key={color}>
                                {color}: {count}
                            </li>
                        ))}
                    </ul>
                    <div className='blank'></div>
                    <button className='resetBtn' onClick={resetColors}>Reset</button>
                </div>
            </div>
        </div>
    );

};

export default Calendar;
