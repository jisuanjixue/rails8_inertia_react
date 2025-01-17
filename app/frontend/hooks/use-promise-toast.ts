const usePromiseToast = (toastInstance: {
  promise: (
    promise: Promise<any>,
    options: {
      loading: string;
      success: string;
      error: (error: Error) => string;
    }
  ) => void
}) => {
  const toastPromise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: (error: Error) => string;
    },
    isImageUpload = false // 新增参数，标识是否为图片上传
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      toastInstance.promise(
        promise.then(async (res) => {
          if (isImageUpload && res instanceof Response) {
            if (res.status === 200) {
              const { url } = (await res.json()) as { url: string };
              const image = new Image();
              image.src = url;
              await new Promise((resolve) => (image.onload = resolve));
              return url;
            } else if (res.status === 401) {
              throw new Error("`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.");
            } else {
              throw new Error("Error uploading image. Please try again.");
            }
          }
          return res;
        }),
        {
          loading: messages.loading,
          success: messages.success,
          error: (e) => {
            reject(e);
            return messages.error(e);
          },
        }
      );
    });
  };

  return { toastPromise };
};

  export { usePromiseToast };