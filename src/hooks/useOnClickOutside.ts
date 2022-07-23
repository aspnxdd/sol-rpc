import { onMounted, onUnmounted, Ref } from 'vue';

const useOnClickOutside = (
  ref: Ref<HTMLElement | null>,
  callback = () => {},
) => {
  function handleClickOutside(event: MouseEvent) {
    if (!ref.value?.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
};

export default useOnClickOutside;
