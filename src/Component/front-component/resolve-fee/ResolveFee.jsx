import React from 'react';
import { useEffect } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import './ResolveFee.scss';

function ResolveFee() {
    const informationUser = checkAuthenRole();

useEffect(() => {
    console.log(informationUser);
}, []);

  return (
    <div className="resolve-fee">
     
    <h3 className="resolve-fee-head pt-2">Thông tin học phí</h3>
    <div className="resolve-fee-title">Thông tin sinh viên</div>
    <div className="resolve-fee-table">
        <table style={{width: '100%'}}>
            <tr>
                <td>Họ và tên</td>
                <td>Smith</td>
            </tr>
            <tr>
                <td>MSSV</td>
                <td>Jackson</td>
            </tr>
            <tr>
                <td>Ngày sinh</td>
                <td>Doe</td>
            </tr>
            <tr>
                <td>Khoa</td>
                <td>Doe</td>
            </tr>
            <tr>
                <td>Hệ đào tạo</td>
                <td>Doe</td>
            </tr>
        </table>
    </div>
    

    </div>
  )
}

export default ResolveFee
