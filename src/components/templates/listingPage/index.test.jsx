import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import ListingPage from './index';
import { chipItems } from 'test/fixtures/listingChips';
import SnippetFactory from 'test/fixtures/factories/snippet';
import PaginatorFactory from 'test/fixtures/factories/paginator';

const paginator = PaginatorFactory.create('Paginator');

describe('<ListingPage />', () => {
  const snippetList = SnippetFactory.createMany('PreviewSnippet', 2);
  const listingName = 'Snippet list';
  const pageDescription = 'Browse 100 snippets on 30 seconds of code';
  let wrapper, pageTitle, paginate;

  beforeEach(() => {
    wrapper = renderWithContext(
      <ListingPage
        snippetList={snippetList}
        paginator={paginator}
        listingName={listingName}
        pageDescription={pageDescription}
        listingSublinks={chipItems}
        listingCover='/splash.png'
      />
    ).container;
    pageTitle = wrapper.querySelector('.page-title');
    paginate = wrapper.querySelector('.paginator');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('a PageTitle component', () => {
      expect(wrapper.querySelectorAll('.page-title')).toHaveLength(1);
    });

    it('a Paginator component', () => {
      expect(wrapper.querySelectorAll('.paginator')).toHaveLength(1);
    });

    it('a ListingChips component', () => {
      expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(1);
    });

    it('the appropriate PreviewCard components', () => {
      expect(wrapper.querySelectorAll('.list-card')).toHaveLength(2);
    });
  });

  it('should pass the correct data to the Meta component', () => {
    expect(document.title).toContain(listingName);
  });

  it('should pass the listingName to PageTitle', () => {
    expect(pageTitle.textContent).toBe(listingName);
  });

  it('should pass the paginator to Paginator', () => {
    expect(paginate.querySelector('span').textContent).toEqual(
      `${paginator.pageNumber}`
    );
  });

  describe('with empty sublinks', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <ListingPage
          snippetList={snippetList}
          paginator={paginator}
          listingName={listingName}
          pageDescription={pageDescription}
          listingCover='/splash.png'
        />
      ).container;
    });

    it('should not render a ListingChips component', () => {
      expect(wrapper.querySelectorAll('.listing-chips')).toHaveLength(0);
    });
  });

  describe('with empty paginator', () => {
    beforeEach(() => {
      wrapper = renderWithContext(
        <ListingPage
          snippetList={snippetList}
          listingName={listingName}
          pageDescription={pageDescription}
          listingSublinks={chipItems}
          listingCover='/splash.png'
        />
      ).container;
    });

    it('should not render a Paginator component', () => {
      expect(wrapper.querySelectorAll('.paginator')).toHaveLength(0);
    });
  });
});
