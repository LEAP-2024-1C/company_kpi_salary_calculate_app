'use client';

import { Category } from '@/constants/data';
import { useState } from 'react';

const categories: Category[] = [
  {
    _id: '671afda11208d7373353b1a1',
    categoryName: 'Харма',
    procedures: [
      {
        _id: '671afda11208d7373353b1a2',
        taskName: 'таг 1-р оёо хавчуургатай',
        quantity: 2,
        unitPrice: 350
      },
      {
        _id: '671afda11208d7373353b1a3',
        taskName: 'таг лавчик 0.6',
        quantity: 2,
        unitPrice: 200
      }
    ]
  },
  {
    _id: '671aff3f1208d7373353b1aa',
    categoryName: 'Холбох',
    procedures: [
      {
        _id: '671aff3f1208d7373353b1ab',
        taskName: 'Мөр залгах 1-р',
        quantity: 2,
        unitPrice: 200
      },
      {
        _id: '671aff3f1208d7373353b1ac',
        taskName: 'Мөр лавчик ХОС ногоон',
        quantity: 4,
        unitPrice: 450
      }
    ]
  }
];

export default function CheckboxReactHookFormMultiple() {
  const [catForm, setCatForm] = useState<Category[]>([
    {
      categoryName: '',
      _id: '',
      procedures: [{ taskName: '', quantity: 0, unitPrice: 0, _id: '' }]
    }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    setCatForm([
      ...catForm[name]: value,
    ]);
    console.log('data', catForm);
  };
  const handleChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('data', e.target.value);
  };
  return (
    <section>
      <div className="ml-10 flex flex-col">
        {categories.map(({ categoryName, procedures, _id }, idx) => (
          <div>
            <div>
              <input
                value={categoryName}
                type="checkbox"
                className="mr-2"
                name="categoryName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> handleChange(e, idx)}
              />
              <label htmlFor="">{categoryName}</label>
            </div>
            {procedures.map(({ taskName, quantity, unitPrice }) => (
              <div className="ml-20">
                <input
                  value={taskName}
                  type="checkbox"
                  className="mr-2"
                  data-id={idx}
                  name="taskName"
                  onChange={handleChangeSub}
                />
                <label htmlFor="">{taskName}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
