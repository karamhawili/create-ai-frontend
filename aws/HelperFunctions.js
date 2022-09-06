import axios from 'axios';
import { toast } from 'react-toastify';

/*
    - valid actions:
        - generate_random
        - generate_output
        - interpolate
        - get_image_from_z
        - generate_from_seeds
    
    - generate_random
        - request   :   action, truncation_psi, noise_mode, number_of_images
        - response  :   List[images], List[seeds]

    - generate_output
        - request   :   action, List[seeds], truncation_psi, noise_mode
        - response  :   List[images], List[z_out]

    - interpolate
        - request   :   action, List[z_out], seed_target, truncation_psi, noise_mode, alpha
        - response  :   List[images], List[z_out]

    - get_image_from_z
        - request   :   action, List[z_out], truncation_psi, noise_mode
        - response  :   List[images]

    - generate_from_seeds
        - request   :  action, List[seeds], truncation_psi, noise_mode
        - response  :  List[images], List[seeds]
*/

export const generateOutputFromSeeds = async (seeds) => {
  const payload = {
    action: 'generate_output',
    truncation_psi: 0.8,
    noise_mode: 'const',
    seeds: seeds.map((seed) => Number(seed)),
  };

  console.log('Loading...');

  try {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_GATEWAY_URL,
      payload
    );
    const output = result['data']['images'][0];
    const z_out = result['data']['z_out'];

    const values = {
      output,
      z_out,
    };

    return values;
  } catch (e) {
    console.log('Error', e);
  }

  console.log('Done Loading');
};

export const interpolate = async (z_out, seed) => {
  const payload = {
    action: 'interpolate',
    truncation_psi: 0.8,
    noise_mode: 'const',
    seed_target: Number(seed),
    alpha: 0.2,
    z_out: z_out,
  };

  console.log('Loading...');

  try {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_GATEWAY_URL,
      payload
    );
    const output = result['data']['images'][0];
    const z_out = result['data']['z_out'];

    const values = {
      output,
      z_out,
    };

    return values;
  } catch (e) {
    console.log('Error', e);
  }

  console.log('Done Loading');
};

export const shuffleTargets = async (currentTargets) => {
  const nbrImgs =
    currentTargets.length === 0
      ? 6
      : currentTargets.filter((target) => {
          if (target.locked == false) return target;
        }).length;

  if (nbrImgs === 0) {
    toast.warn('All targets are locked');
    throw 'All targets are locked';
  }

  const payload = {
    action: 'generate_random',
    truncation_psi: 0.8,
    noise_mode: 'const',
    number_of_images: nbrImgs,
  };

  console.log('Loading...');

  try {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_GATEWAY_URL,
      payload
    );
    const images = result['data']['images'];
    const seeds = result['data']['seeds'];

    const values = {
      images,
      seeds,
    };

    return values;
  } catch (e) {
    console.log('Error', e);
  }

  console.log('Done Loading');
};

export const loadOutput = async (output) => {
  const payload = {
    action: 'get_image_from_z',
    truncation_psi: 0.8,
    noise_mode: 'const',
    z_out: output,
  };

  console.log('Loading output...');

  try {
    const resultOut = await axios.post(
      process.env.NEXT_PUBLIC_API_GATEWAY_URL,
      payload
    );
    const output = resultOut['data']['images'][0];

    console.log('Done Loading');

    return output;
  } catch (e) {
    console.log('Error', e);
  }
};

export const loadTargets = async (seeds) => {
  // target seeds
  const payload = {
    action: 'generate_from_seeds',
    truncation_psi: 0.8,
    noise_mode: 'const',
    seeds: seeds.map((str) => {
      return Number(str);
    }),
  };

  console.log('Loading targets...');

  try {
    const resultTarg = await axios.post(
      process.env.NEXT_PUBLIC_API_GATEWAY_URL,
      payload
    );
    const targetImages = resultTarg['data']['images'];

    console.log('Done Loading');

    return targetImages;
  } catch (e) {
    console.log('Error', e);
  }
};
