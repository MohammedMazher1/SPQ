'use client';
import SettingAccordion from '../_components/settingAccordion';
import Categories from '../_components/general.tsx/categories';
import CreateDialog from '../_components/dialog';
import CategoriesForm from '../_components/general.tsx/forms/categoriesForm';
import CurrencyForm from '../_components/general.tsx/forms/currencyForm';
import SizeForm from '../_components/general.tsx/forms/sizeForm';
import AccountForm from '../_components/general.tsx/forms/bankAccountForm';
import Currency from '../_components/general.tsx/currency';
import Sizes from '../_components/general.tsx/sizes';
import Accounts from '../_components/general.tsx/bankAccount';

export default function General() {
  const accordionLists = [
    {
      title: 'الفئات',
      content: <Categories />,
      button: (
        <CreateDialog
          triggerLabel="اضافة فئة"
          dialogContent={<CategoriesForm />}
        />
      ),
    },
    {
      title: 'العملات',
      content: <Currency />,
      button: (
        <CreateDialog
          triggerLabel="اضافة عملة"
          dialogContent={<CurrencyForm />}
        />
      ),
    },
    {
      title: 'الأحجام',
      content: <Sizes />,
      button: (
        <CreateDialog triggerLabel="اضافة حجم" dialogContent={<SizeForm />} />
      ),
    },
    {
      title: 'الحسابات البنكية',
      content: <Accounts />,
      button: (
        <CreateDialog
          triggerLabel="اضافة حساب "
          dialogContent={<AccountForm />}
        />
      ),
    },
  ];
  return (
    <div className="space-y-4">
      {accordionLists.map((list, idx) => (
        <SettingAccordion
          key={idx}
          label={list.title}
          accordionContent={list.content}
          accordionButton={list.button}
        />
      ))}
    </div>
  );
}
