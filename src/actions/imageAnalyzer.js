import Promise from 'bluebird';

// Converted from
// https://github.com/lukasklein/itunes-colors/blob/master/js/app.js
class ImageAnalyzer {
  constructor() {
    this.bgcolor = null;
    this.primaryColor = null;
    this.secondaryColor = null;
    this.detailColor = null;
  }

  getColors(image) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const cvs = document.createElement('canvas');
        cvs.width = img.width;
        cvs.height = img.height;
        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);
        this.bgcolor = this.findEdgeColor(cvs, ctx);
        return this.findTextColors(cvs, ctx, () => {
          resolve(this.bgcolor, this.primaryColor, this.secondaryColor,
                  this.detailColor);
        });
      };
    });
  }

  findEdgeColor(cvs, ctx) {
    const leftEdgeColors = ctx.getImageData(0, 0, 1, cvs.height);
    const colorCount = {};
    for (let pixel = _i = 0, _ref = cvs.height; 0 <= _ref ? _i < _ref : _i > _ref; pixel = 0 <= _ref ? ++_i : --_i) {
      const red = leftEdgeColors.data[pixel * 4];
      const green = leftEdgeColors.data[pixel * 4 + 1];
      const blue = leftEdgeColors.data[pixel * 4 + 2];
      const index = red + ',' + green + ',' + blue;
      if (!colorCount[index]) {
        colorCount[index] = 0;
      }
      colorCount[index]++;
    }
    const sortedColorCount = [];
    for (const color in colorCount) {
      if (colorCount.hasOwnProperty(color)) {
        const count = colorCount[color];
        if (count > 2) {
          sortedColorCount.push([color, count]);
        }
      }
    }
    sortedColorCount.sort((a, b) => {
      return b[1] - a[1];
    });
    let proposedEdgeColor = sortedColorCount[0];
    if (this.isBlackOrWhite(proposedEdgeColor[0])) {
      for (let _j = 0, _len = sortedColorCount.length; _j < _len; _j++) {
        const nextProposedEdgeColor = sortedColorCount[_j];
        if (nextProposedEdgeColor[1] / proposedEdgeColor[1] > 0.3) {
          if (!this.isBlackOrWhite(nextProposedEdgeColor[0])) {
            proposedEdgeColor = nextProposedEdgeColor;
            break;
          }
        }
      }
    }
    return proposedEdgeColor[0];
  }

  findTextColors(cvs, ctx, cb) {
    const colors = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const findDarkTextColor = !this.isDarkColor(this.bgcolor);
    const colorCount = {};
    for (let row = _i = 0, _ref = cvs.height; 0 <= _ref ? _i < _ref : _i > _ref; row = 0 <= _ref ? ++_i : --_i) {
      for (let column = _j = 0, _ref1 = cvs.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; column = 0 <= _ref1 ? ++_j : --_j) {
        const red = colors.data[(row * (cvs.width * 4)) + (column * 4)];
        const green = colors.data[((row * (cvs.width * 4)) + (column * 4)) + 1];
        const blue = colors.data[((row * (cvs.width * 4)) + (column * 4)) + 2];
        const index = red + ',' + green + ',' + blue;
        if (!colorCount[index]) {
          colorCount[index] = 0;
        }
        colorCount[index]++;
      }
    }
    const possibleColorsSorted = [];
    for (const color in colorCount) {
      if (colorCount.hasOwnProperty(color)) {
        const count = colorCount[color];
        const curDark = this.isDarkColor(color);
        if (curDark === findDarkTextColor) {
          possibleColorsSorted.push([color, count]);
        }
      }
    }
    possibleColorsSorted.sort((a, b) => {
      return b[1] - a[1];
    });
    for (let _k = 0, _len = possibleColorsSorted.length; _k < _len; _k++) {
      const color = possibleColorsSorted[_k];
      if (!this.primaryColor) {
        if (this.isContrastingColor(color[0], this.bgcolor)) {
          this.primaryColor = color[0];
        }
      } else if (!this.secondaryColor) {
        if (!this.isDistinct(this.primaryColor, color[0]) || !this.isContrastingColor(color[0], this.bgcolor)) {
          continue;
        }
        this.secondaryColor = color[0];
      } else if (!this.detailColor) {
        if (!this.isDistinct(this.secondaryColor, color[0]) || !this.isDistinct(this.primaryColor, color[0]) || !this.isContrastingColor(color[0], this.bgcolor)) {
          continue;
        }
        this.detailColor = color[0];
        break;
      }
    }
    const defaultColor = findDarkTextColor ? '0,0,0' : '255,255,255';
    if (!this.primaryColor) {
      this.primaryColor = defaultColor;
    }
    if (!this.secondaryColor) {
      this.secondaryColor = defaultColor;
    }
    if (!this.detailColor) {
      this.detailColor = defaultColor;
    }
    return cb();
  }

  isBlackOrWhite(color) {
    const splitted = color.split(',');
    const red = splitted[0];
    const green = splitted[1];
    const blue = splitted[2];
    const thresholdWhite = 255 * 0.91;
    const thresholdBlack = 255 * 0.09;
    if (red > thresholdWhite && green > thresholdWhite &&
        blue > thresholdWhite) {
      return true;
    }
    if (red < thresholdBlack && green < thresholdBlack &&
        blue < thresholdBlack) {
      return true;
    }
    return false;
  }

  isDarkColor(color) {
    if (color) {
      const splitted = color.split(',');
      const red = splitted[0] / 255;
      const green = splitted[1] / 255;
      const blue = splitted[2] / 255;
      const lum = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      return lum < 0.5;
    }
    return false;
  }

  isContrastingColor(color1, color2) {
    const splitted1 = color1.split(',');
    const red1 = splitted1[0] / 255;
    const green1 = splitted1[1] / 255;
    const blue1 = splitted1[2] / 255;
    const lum1 = 0.2126 * red1 + 0.7152 * green1 + 0.0722 * blue1;
    const splitted2 = color2.split(',');
    const red2 = splitted2[0] / 255;
    const green2 = splitted2[1] / 255;
    const blue2 = splitted2[2] / 255;
    const lum2 = 0.2126 * red2 + 0.7152 * green2 + 0.0722 * blue2;
    let contrast = 0;
    if (lum1 > lum2) {
      contrast = (lum1 + 0.05) / (lum2 + 0.05);
    } else {
      contrast = (lum2 + 0.05) / (lum1 + 0.05);
    }
    return contrast > 1.6;
  }

  isDistinct(color1, color2) {
    const splitted1 = color1.split(',');
    const red1 = splitted1[0] / 255;
    const green1 = splitted1[1] / 255;
    const blue1 = splitted1[2] / 255;
    const splitted2 = color2.split(',');
    const red2 = splitted2[0] / 255;
    const green2 = splitted2[1] / 255;
    const blue2 = splitted2[2] / 255;
    const threshold = 0.25;
    if (Math.abs(red1 - red2) > threshold ||
        Math.abs(green1 - green2) > threshold ||
        Math.abs(blue1 - blue2) > threshold) {
      if (Math.abs(red1 - green1) < 0.03 && Math.abs(red1 - blue1) < 0.03) {
        if (Math.abs(red2 - green2) < 0.03 && Math.abs(red2 - blue2) < 0.03) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}

export default ImageAnalyzer;
