import { act, waitFor } from '@testing-library/react';
import { clear, get } from 'idb-keyval';
import { renderQueryHook } from '@/test/renderQueryHook';
import { useProfile } from './useProfile';

describe('useProfile', () => {
  beforeEach(() => clear());

  it('starts with the sample profile', async () => {
    const { result } = await renderQueryHook(() => useProfile());
    expect(result.current.profile).toMatchObject({ fullName: 'Alex Morgan', heightCm: 178 });
  });

  it('saves the profile', async () => {
    const { result } = await renderQueryHook(() => useProfile());
    const updated = { ...result.current.profile, heightCm: 180 };

    await act(() => result.current.saveProfile(updated));

    await waitFor(() => expect(result.current.profile.heightCm).toBe(180));
    expect(await get('profile')).toEqual(updated);
  });
});
