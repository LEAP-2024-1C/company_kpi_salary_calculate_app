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
  },
  {
    _id: '671aff3f1208d7373353b1ac',
    categoryName: 'Ханцуй',
    procedures: [
      {
        _id: '671aff3f1208d7373353b1aa',
        taskName: 'Мөр залгах 1-р',
        quantity: 2,
        unitPrice: 200
      },
      {
        _id: '671aff3f1208d7373353b1aq',
        taskName: 'Мөр лавчик ХОС ногоон',
        quantity: 4,
        unitPrice: 450
      },
      {
        _id: '671aff3f1208d7373353b1aq',
        taskName: 'Мөр лавчик ХОС ногоон',
        quantity: 4,
        unitPrice: 450
      }
    ]
  }
];

export default function CheckboxReactHookFormMultiple() {
  const [catForm, setCatForm] = useState<Category[]>(
    categories.map((category) => ({
      categoryName: category.categoryName,
      _id: category._id,
      procedures: category.procedures.map((proc) => ({
        taskName: proc.taskName,
        quantity: proc.quantity,
        unitPrice: proc.unitPrice,
        _id: proc._id,
        proCheck: false
      }))
    }))
  );

  const [isCheck, setIsCheck] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    catIndex: number
  ) => {
    const { checked } = e.target;
    const updated = [...isCheck];
    updated[catIndex] = checked;
    setIsCheck(updated);
  };

  const handleInputChange = (
    catIndex: number,
    procIndex: number,
    field: 'quantity' | 'unitPrice',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCatForm((prev) => {
      const newCatForm = [...prev];
      const updatedProcedures = [...newCatForm[catIndex].procedures];

      if (field === 'quantity') {
        updatedProcedures[procIndex].quantity = Number(value);
      } else {
        updatedProcedures[procIndex].unitPrice = Number(value);
      }

      newCatForm[catIndex].procedures = updatedProcedures;
      return newCatForm;
    });
  };
  const handleProCheckChange = (catIndex: number, procIndex: number) => {
    // setCatForm((prev) => {
    //   const newCatForm = [...prev];
    //   const updatedProcedures = [...newCatForm[catIndex].procedures];
    //   updatedProcedures[procIndex].proCheck = true;
    //   // updatedProcedures[procIndex].proCheck =
    //   //   !updatedProcedures[procIndex].proCheck;
    //   newCatForm[catIndex].procedures = updatedProcedures;
    //   console.log('boolean', updatedProcedures[procIndex].proCheck);
    //   return newCatForm;
    // });
    setCatForm((prev) => {
      return prev.map((category, index) => {
        if (index === catIndex) {
          return {
            ...category,
            procedures: category.procedures.map((proc, procIdx) => {
              if (procIdx === procIndex) {
                return { ...proc, proCheck: !proc.proCheck };
              }
              return proc;
            })
          };
        }
        return category;
      });
    });
  };

  const getCheckedValues = () => {
    const checkedValues = catForm
      .map((category, catIndex) => {
        if (isCheck[catIndex]) {
          return {
            categoryName: category.categoryName,
            _id: category._id,
            procedures: category.procedures.filter(
              (item) => item.proCheck === true
            )
          };
        }
        return null;
      })
      .filter(Boolean);
    const value = checkedValues.filter((item) => item?.procedures.length !== 0);
    console.log('Checked Values:', value);
  };

  return (
    <section>
      <div className="ml-10 flex flex-col">
        {categories.map(({ categoryName, procedures }, catIndex) => (
          <div key={catIndex}>
            <div>
              <input
                value={categoryName}
                type="checkbox"
                className="mr-2"
                checked={isCheck[catIndex]}
                onChange={(e) => handleChange(e, catIndex)}
              />
              <label>{categoryName}</label>
            </div>
            {procedures.map(({ taskName }, procIndex) => (
              <div className="ml-20" key={procIndex}>
                <input
                  checked={catForm[catIndex].procedures[procIndex].proCheck}
                  value={taskName}
                  type="checkbox"
                  className="mr-2"
                  disabled={!isCheck[catIndex]}
                  onChange={(e) => handleProCheckChange(catIndex, procIndex)}
                />
                <label>{taskName}</label>
                <input
                  type="number"
                  value={catForm[catIndex].procedures[procIndex].quantity}
                  disabled={!isCheck[catIndex]}
                  onChange={(e) =>
                    handleInputChange(catIndex, procIndex, 'quantity', e)
                  }
                />
                <input
                  type="number"
                  value={catForm[catIndex].procedures[procIndex].unitPrice}
                  disabled={!isCheck[catIndex]}
                  onChange={(e) =>
                    handleInputChange(catIndex, procIndex, 'unitPrice', e)
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={getCheckedValues}>Get Checked Values</button>
    </section>
  );
}
