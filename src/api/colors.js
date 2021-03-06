import Api from './api';

class Colors extends Api {
  static async getColors(imageUrl) {
    const data = await this.
        makeRequest('/api/colors?url=' + encodeURIComponent(imageUrl) +
                    '&format=json');
    return data;
  }
}

export default Colors;
