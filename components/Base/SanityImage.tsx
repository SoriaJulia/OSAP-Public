import urlBuilder from '@sanity/image-url';

export const SanityImage = ({ value, isInline }: { value: any; isInline: boolean }) => {
  return (
    <img
      className="my-2"
      src={urlBuilder()
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .projectId('p6yd2y5a')
        .dataset('production')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
      }}
    />
  );
};
