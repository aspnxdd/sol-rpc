import { onMounted, onUnmounted, Ref } from 'vue';

const useOnClickOutside = <T extends HTMLElement>(
  ref: Ref<T | null>,
  callback: () => void,
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
