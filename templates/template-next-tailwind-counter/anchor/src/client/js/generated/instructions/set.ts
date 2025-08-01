/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type AccountMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyUint8Array,
  type WritableAccount,
} from 'gill';
import { COUNTER_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_DISCRIMINATOR = new Uint8Array([
  198, 51, 53, 241, 116, 29, 126, 194,
]);

export function getSetDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(SET_DISCRIMINATOR);
}

export type SetInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountCounter extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountCounter extends string
        ? WritableAccount<TAccountCounter>
        : TAccountCounter,
      ...TRemainingAccounts,
    ]
  >;

export type SetInstructionData = {
  discriminator: ReadonlyUint8Array;
  value: number;
};

export type SetInstructionDataArgs = { value: number };

export function getSetInstructionDataEncoder(): FixedSizeEncoder<SetInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['value', getU8Encoder()],
    ]),
    (value) => ({ ...value, discriminator: SET_DISCRIMINATOR })
  );
}

export function getSetInstructionDataDecoder(): FixedSizeDecoder<SetInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['value', getU8Decoder()],
  ]);
}

export function getSetInstructionDataCodec(): FixedSizeCodec<
  SetInstructionDataArgs,
  SetInstructionData
> {
  return combineCodec(
    getSetInstructionDataEncoder(),
    getSetInstructionDataDecoder()
  );
}

export type SetInput<TAccountCounter extends string = string> = {
  counter: Address<TAccountCounter>;
  value: SetInstructionDataArgs['value'];
};

export function getSetInstruction<
  TAccountCounter extends string,
  TProgramAddress extends Address = typeof COUNTER_PROGRAM_ADDRESS,
>(
  input: SetInput<TAccountCounter>,
  config?: { programAddress?: TProgramAddress }
): SetInstruction<TProgramAddress, TAccountCounter> {
  // Program address.
  const programAddress = config?.programAddress ?? COUNTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    counter: { value: input.counter ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.counter)],
    programAddress,
    data: getSetInstructionDataEncoder().encode(args as SetInstructionDataArgs),
  } as SetInstruction<TProgramAddress, TAccountCounter>;

  return instruction;
}

export type ParsedSetInstruction<
  TProgram extends string = typeof COUNTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    counter: TAccountMetas[0];
  };
  data: SetInstructionData;
};

export function parseSetInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedSetInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      counter: getNextAccount(),
    },
    data: getSetInstructionDataDecoder().decode(instruction.data),
  };
}
