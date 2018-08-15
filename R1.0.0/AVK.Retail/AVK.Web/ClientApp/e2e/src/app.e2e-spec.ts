




import { AppPage } from './app.po';

describe('AVK.Web App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application title: AVK.Web', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('AVK.Web');
  });
});
