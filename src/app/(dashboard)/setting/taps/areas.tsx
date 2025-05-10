'use client';
import SettingAccordion from '../_components/settingAccordion';
import CreateDialog from '../_components/dialog';
import Governorates from '../_components/areas/governorates';
import Directorates from '../_components/areas/directorates';
import CreateGovernorate from '../_components/areas/forms/createGovernorate';
import CreateDirectorate from '../_components/areas/forms/createDirectorate';

export default function Areas() {
  const accordionLists = [
    {
      title: 'المحافظات',
      content: <Governorates />,
      button: (
        <CreateDialog
          triggerLabel="اضافة محافظة"
          dialogContent={<CreateGovernorate />}
        />
      ),
    },
    {
      title: 'المديريات',
      content: <Directorates />,
      button: (
        <CreateDialog
          triggerLabel="اضافة مديرية"
          dialogContent={<CreateDirectorate />}
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
