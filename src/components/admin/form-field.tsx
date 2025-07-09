interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      <div className="text-sm text-red-600 min-h-[1.5rem]">{error ?? ""}</div>
    </div>
  );
}
