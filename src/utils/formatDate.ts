  export const formatFecha = (isoDate: string = ""): string => {
    if (!isoDate) return "";
    const fecha = new Date(isoDate);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(fecha);
  };