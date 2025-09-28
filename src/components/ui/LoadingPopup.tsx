const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 p-6">
        <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
        <p className="text-white font-medium text-base">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
